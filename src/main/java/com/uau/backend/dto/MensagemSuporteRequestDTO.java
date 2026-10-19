package com.uau.backend.dto;
import jakarta.validation.constraints.*;
public record MensagemSuporteRequestDTO(@NotBlank @Size(max=5000) String texto) {}
