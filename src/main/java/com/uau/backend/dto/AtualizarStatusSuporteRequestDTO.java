package com.uau.backend.dto;
import com.uau.backend.entity.StatusSuporte;
import jakarta.validation.constraints.NotNull;
public record AtualizarStatusSuporteRequestDTO(@NotNull StatusSuporte status,@NotNull Long version) {}
