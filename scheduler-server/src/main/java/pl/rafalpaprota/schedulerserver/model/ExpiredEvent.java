package pl.rafalpaprota.schedulerserver.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Table(name = "expired_events")
@Entity
public class ExpiredEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(nullable = false)
    private LocalDateTime dateFrom;

    @Column(nullable = false)
    private LocalDateTime dateTo;

    @Column(nullable = false)
    private String colour;

    @Column
    private String description;

    @Column(nullable = false)
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
}
