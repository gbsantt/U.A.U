package com.uau.backend.dto;
import com.uau.backend.entity.OrigemMedicao;
import java.time.LocalDateTime;
public record HistoricoAdminResponseDTO(Long id,Integer quantidadePessoas,Double percentualOcupacao,LocalDateTime registradoEm,OrigemMedicao origem,Long dispositivoId,Long operadorId) {}
