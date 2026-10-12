package com.uau.backend.dto;
import com.uau.backend.entity.CategoriaSuporte;
import jakarta.validation.constraints.*;
public record CriarSolicitacaoSuporteRequestDTO(@NotBlank @Size(max=150) String assunto,
    @NotNull CategoriaSuporte categoria,@NotBlank @Size(max=5000) String descricao) {}
