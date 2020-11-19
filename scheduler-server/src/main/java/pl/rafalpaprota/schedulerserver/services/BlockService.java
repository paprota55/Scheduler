package pl.rafalpaprota.schedulerserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.rafalpaprota.schedulerserver.dto.BlockDTO;
import pl.rafalpaprota.schedulerserver.model.Block;
import pl.rafalpaprota.schedulerserver.model.User;
import pl.rafalpaprota.schedulerserver.repositories.BlockRepository;

import javax.transaction.Transactional;
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

    public List<BlockDTO> getCurrentUserBlocks() {
        User user = this.userService.getCurrentUser();
        ArrayList<Block> blockList = (ArrayList<Block>) this.blockRepository.findAllByUser(user);
        ArrayList<BlockDTO> blockDTOList = new ArrayList<>();
        for (Block current : blockList) {
            blockDTOList.add(new BlockDTO(current.getBlockName(), current.getDateFrom(), current.getDateTo()));
        }
        return blockDTOList;
    }


    ///////////////////////Admin//////////////////////////////
    public List<Block> getAllBlocks() {
        return (List<Block>) this.blockRepository.findAll();
    }
}
