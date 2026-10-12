package com.uau.backend.dto;
import jakarta.validation.constraints.*;
import com.uau.backend.entity.TipoUnidade;
import com.uau.backend.entity.TipoUsuario;
import com.uau.backend.validation.SenhaValida;
public record UsuarioRequestDTO(@NotBlank @Size(max=120) String nome, @NotBlank @Email @Size(max=180) String email, @NotBlank @Size(min=6,max=72) @SenhaValida String senha, @NotNull TipoUsuario tipo) {}
