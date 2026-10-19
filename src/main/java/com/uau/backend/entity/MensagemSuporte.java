package com.uau.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
@Entity @Table(name="mensagem_suporte") @Getter @Setter @NoArgsConstructor
public class MensagemSuporte {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="solicitacao_id",nullable=false) private SolicitacaoSuporte solicitacao;
    @Column(nullable=false) private boolean equipe;
    @Column(nullable=false,length=5000) private String texto;
    @Column(nullable=false) private Instant createdAt;
    @PrePersist void criar() { createdAt=Instant.now(); }
}
