package pl.rafalpaprota.schedulerserver.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class BlockDisplayDTO {
    private String blockName;
    private String dateTo;
    private String dateFrom;

    public BlockDisplayDTO() {

    }

    public BlockDisplayDTO(String blockName, LocalDateTime dateFrom, LocalDateTime dateTo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        this.blockName = blockName;
        this.dateFrom = dateFrom.format(formatter);
        this.dateTo = dateTo.format(formatter);
    }
}
