package com.uau.backend.dto;

import com.uau.backend.entity.TipoUsuario;


public record LoginResponseDTO(

        Long id,

        String nome,

        String email,

        TipoUsuario tipo,

        String token

) {
}