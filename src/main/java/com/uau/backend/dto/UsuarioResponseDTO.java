package com.uau.backend.dto;

import com.uau.backend.entity.TipoUsuario;


public record UsuarioResponseDTO(

        Long id,

        String nome,

        String email,

        TipoUsuario tipo,

        Boolean ativo

) {
}