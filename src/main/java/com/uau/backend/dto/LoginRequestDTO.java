package com.uau.backend.dto;
import jakarta.validation.constraints.*;
import com.uau.backend.entity.TipoUnidade;
import com.uau.backend.entity.TipoUsuario;
import com.uau.backend.validation.SenhaValida;
public record LoginRequestDTO(@NotBlank @Email @Size(max=180) String email, @NotBlank @Size(max=72) @SenhaValida String senha) {}
