package com.uau.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "unidade_atendimento")
@Getter
@Setter
@NoArgsConstructor
public class UnidadeAtendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, length = 255)
    private String endereco;

    @Column(length = 20)
    private String telefone;

    @Column(nullable = false)
    private Integer ocupacaoAtual = 0;

    private Double latitude;

    private Double longitude;

    @Column(nullable = false)
    private LocalDateTime ultimaAtualizacao;

    @PrePersist
    public void prePersist() {
        if (ocupacaoAtual == null) {
            ocupacaoAtual = 0;
        }

        ultimaAtualizacao = LocalDateTime.now();
    }
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoUnidade tipo;

    @Column(nullable = false)
    private Integer capacidadeAreaMonitorada;

    @Column(length = 143)
    private String horariosTrocaTurno;

    public List<String> getHorariosTrocaTurno() {
        return horariosTrocaTurno == null || horariosTrocaTurno.isEmpty()
            ? List.of() : List.of(horariosTrocaTurno.split(","));
    }

    public void setHorariosTrocaTurno(List<String> horarios) {
        horariosTrocaTurno = String.join(",", horarios.stream().distinct().sorted().toList());
    }

}