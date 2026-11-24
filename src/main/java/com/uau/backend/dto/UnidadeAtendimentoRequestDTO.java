package com.uau.backend.dto;
import jakarta.validation.constraints.*;
import com.uau.backend.entity.TipoUnidade;
import java.util.List;
public record UnidadeAtendimentoRequestDTO(@NotBlank @Size(max=150) String nome, @NotBlank @Size(max=255) String endereco, @Size(max=20) String telefone,
    @NotNull @Min(1) Integer capacidadeAreaMonitorada, @NotNull TipoUnidade tipo,
    @Size(max=100) String nomeCamera,
    @DecimalMin("-90") @DecimalMax("90") Double latitude, @DecimalMin("-180") @DecimalMax("180") Double longitude,
    @Size(max=24) List<@NotNull @Pattern(regexp="(?:[01][0-9]|2[0-3]):[0-5][0-9]") String> horariosTrocaTurno) {}
