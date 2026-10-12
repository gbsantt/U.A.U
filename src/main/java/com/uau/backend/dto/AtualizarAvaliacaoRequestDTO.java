package com.uau.backend.dto;
import jakarta.validation.constraints.*;
import com.uau.backend.entity.TipoUnidade;
import com.uau.backend.entity.TipoUsuario;
import com.uau.backend.validation.SenhaValida;
public record AtualizarAvaliacaoRequestDTO(@NotNull @Min(1) @Max(5) Integer nota, @Size(max=500) String comentario) {}
