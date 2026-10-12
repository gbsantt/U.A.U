package com.uau.backend.dto;
import jakarta.validation.constraints.*;
import com.uau.backend.entity.TipoUnidade;
import com.uau.backend.entity.TipoUsuario;
import com.uau.backend.validation.SenhaValida;
public record VerificarCodigoRequestDTO(@NotBlank @Email @Size(max=180) String email, @NotBlank @Pattern(regexp="[0-9]{6}") String codigo) {}
