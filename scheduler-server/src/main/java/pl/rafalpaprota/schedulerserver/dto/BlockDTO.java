package pl.rafalpaprota.schedulerserver.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BlockDTO {
    private String blockName;
    private LocalDateTime dateTo;
    private LocalDateTime dateFrom;

    public BlockDTO() {

    }

    public BlockDTO(String blockName, LocalDateTime dateFrom, LocalDateTime dateTo) {
        this.blockName = blockName;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
