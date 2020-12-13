package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.dto.BlockDTO;
import pl.rafalpaprota.schedulerserver.dto.BlockDisplayDTO;
import pl.rafalpaprota.schedulerserver.model.Block;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.BlockRepository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class BlockService {
    private final BlockRepository blockRepository;
    private final UserService userService;

    @Autowired
    public BlockService(BlockRepository blockRepository, UserService userService) {
        this.blockRepository = blockRepository;
        this.userService = userService;
    }

    public Boolean checkBlockExist(String blockName, User user) {
        if (blockName.equals("all")) {
            return true;
        }
        Block block = this.blockRepository.findByBlockNameAndUser(blockName, user);
        return block != null;
    }

    public Boolean checkDatesCorrectness(LocalDateTime dateFrom, LocalDateTime dateTo) {
        return !dateFrom.isAfter(dateTo);
    }

    public void modifyBlockInDB(BlockDTO blockDTO, User user) {
        Block block = this.blockRepository.findByBlockNameAndUser(blockDTO.getBlockName(), user);
        block.setDateFrom(blockDTO.getDateFrom().withHour(0).withMinute(0));
        block.setDateTo(blockDTO.getDateTo().withHour(0).withMinute(0));
        System.out.println(block.getBlockName());
        System.out.println(block.getDateTo());
        System.out.println(block.getDateFrom());
        this.blockRepository.save(block);
    }

    public Long addBlockToDB(BlockDTO blockDTO, User user) {
        Block block = new Block();
        block.setBlockName(blockDTO.getBlockName());
        block.setDateTo(blockDTO.getDateTo().withHour(0).withMinute(0));
        block.setDateFrom(blockDTO.getDateFrom().withHour(0).withMinute(0));
        block.setUser(user);

        return this.blockRepository.save(block).getId();
    }

    public void deleteBlockFromDB(String blockName, User user) {
        this.blockRepository.deleteBlockByBlockNameAndUser(blockName, user);
    }

    public Block getBlockByUserAndBlockName(User user, String blockName) {
        return this.blockRepository.findByBlockNameAndUser(blockName, user);
    }

    public List<BlockDisplayDTO> getCurrentUserBlocks() {
        User user = this.userService.getCurrentUser();
        ArrayList<Block> blockList = sortBlockList((ArrayList<Block>) this.blockRepository.findAllByUser(user));
        ArrayList<BlockDisplayDTO> blockDTOList = new ArrayList<>();
        for (Block current : blockList) {
            blockDTOList.add(new BlockDisplayDTO(current.getBlockName(), current.getDateFrom(), current.getDateTo()));
        }
        return blockDTOList;
    }

    public ArrayList<Block> sortBlockList(ArrayList<Block> listToSort) {
        ArrayList<Block> newList = new ArrayList<>();
        if (listToSort != null) {
            if (listToSort.size() == 1) {
                return listToSort;
            }
            int index = 0;
            for (int i = listToSort.size() - 1; i > 0; i--) {
                for (int j = listToSort.size() - 1; j > 0; j--) {
                    if (listToSort.get(index).getDateFrom().isAfter(listToSort.get(j).getDateFrom())) {
                        index = j;
                    }
                }
                newList.add(listToSort.get(index));
                listToSort.remove(index);
                index = 0;
            }
            newList.add(listToSort.get(0));
            return newList;
        }
        return listToSort;
    }
}
