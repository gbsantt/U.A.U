package com.uau.backend.dto;
import com.uau.backend.entity.StatusCamera;
import java.time.*;
public record DispositivoResponseDTO(Long id,String nome,Long unidadeId,boolean ativo,boolean chaveRevogada,
    StatusCamera status,LocalDateTime ultimaComunicacao,Instant chaveGeradaEm,Instant createdAt,Instant updatedAt,long version) {}
