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
    public BlockService(BlockRepository blockRepository, UserService userService, UserService userService1) {
        this.blockRepository = blockRepository;
        this.userService = userService1;
    }

    public Boolean checkBlockExist(String blockName, User user) {
        Block block = this.blockRepository.findByBlockNameAndUser(blockName, user);
        return block != null;
    }

    public Boolean checkDatesCorrectness(LocalDateTime dateFrom, LocalDateTime dateTo) {
        return !dateFrom.isAfter(dateTo);
    }

    public void modifyBlockInDB(BlockDTO blockDTO, User user) {
        Block block = this.blockRepository.findByBlockNameAndUser(blockDTO.getBlockName(), user);
        block.setDateFrom(blockDTO.getDateFrom().plusDays(1).withHour(0));
        block.setDateTo(blockDTO.getDateTo().plusDays(1).withHour(0));
        System.out.println(block.getDateTo());
        System.out.println(block.getDateFrom());
        this.blockRepository.save(block);
    }


    public Long addBlockToDB(BlockDTO blockDTO, User user) {
        Block block = new Block();
        block.setBlockName(blockDTO.getBlockName());
        block.setDateTo(blockDTO.getDateTo());
        block.setDateFrom(blockDTO.getDateFrom());
        block.setUser(user);

        return this.blockRepository.save(block).getId();
    }

    public void deleteBlockFromDB(String blockName, User user) {
        this.blockRepository.deleteBlockByBlockNameAndUser(blockName, user);
    }

//    public List<Block> getCurrentUserBlocks() {
//        User user = this.userService.getCurrentUser();
//        return this.blockRepository.findAllByUser(user);
//    }

    public List<BlockDisplayDTO> getCurrentUserBlocks() {
        User user = this.userService.getCurrentUser();
        ArrayList<Block> blockList = (ArrayList<Block>) this.blockRepository.findAllByUser(user);
        ArrayList<BlockDisplayDTO> blockDTOList = new ArrayList<>();
        for (Block current : blockList) {
            blockDTOList.add(new BlockDisplayDTO(current.getBlockName(), current.getDateFrom(), current.getDateTo()));
        }
        return blockDTOList;
    }
}
