package com.uau.backend.dto;
import java.time.Instant;
public record MensagemSuporteResponseDTO(Long id,boolean equipe,String texto,Instant createdAt) {}
