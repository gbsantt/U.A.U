package com.uau.backend.dto;

import com.uau.backend.entity.RitmoOcupacao;
import com.uau.backend.entity.StatusCamera;
import com.uau.backend.entity.StatusMedicao;
import com.uau.backend.entity.TendenciaOcupacao;

import java.time.LocalDateTime;

public record SituacaoUnidadeResponseDTO(

        Long unidadeId,
        String nome,
        String endereco,
        String telefone,

        Double latitude,
        Double longitude,

        Integer capacidadeAreaMonitorada,
        Integer ocupacaoAtual,
        Double percentualOcupacao,
        String nivelOcupacao,
        Double mediaUltimos30Minutos,
        TendenciaOcupacao tendencia,
        LocalDateTime ultimaAtualizacao,
        StatusMedicao statusMedicao,
        StatusCamera statusCamera,
        RitmoOcupacao ritmoOcupacao,
        com.uau.backend.entity.TipoUnidade tipo

) {
}
