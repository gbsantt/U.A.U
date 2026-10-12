package com.uau.backend.dto;
import com.uau.backend.entity.OrigemMedicao;
import java.time.LocalDateTime;
public record HistoricoOcupacaoResponseDTO(Long id,Long unidadeId,Integer quantidadePessoas,Double percentualOcupacao,LocalDateTime registradoEm,OrigemMedicao origem) {}
