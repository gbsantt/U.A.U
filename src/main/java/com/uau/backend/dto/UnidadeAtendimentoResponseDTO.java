package com.uau.backend.dto;

import java.time.LocalDateTime;
import com.uau.backend.entity.TipoUnidade;

public record UnidadeAtendimentoResponseDTO(

        Long id,

        String nome,

        String endereco,

        String telefone,

        Integer capacidadeAreaMonitorada,

        Integer ocupacaoAtual,

        Double percentualOcupacao,

        String nivelOcupacao,

        Double latitude,

        Double longitude,

        LocalDateTime ultimaAtualizacao,

        TipoUnidade tipo

) {
}