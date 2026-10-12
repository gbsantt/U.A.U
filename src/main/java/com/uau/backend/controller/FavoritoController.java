package com.uau.backend.controller;

import com.uau.backend.dto.SituacaoUnidadeResponseDTO;

import com.uau.backend.entity.Usuario;

import com.uau.backend.service.FavoritoService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/usuarios/me/favoritos")
public class FavoritoController {

    private final FavoritoService favoritoService;


    public FavoritoController(
            FavoritoService favoritoService
    ) {

        this.favoritoService =
                favoritoService;
    }


    @GetMapping
    public List<SituacaoUnidadeResponseDTO> listar(
            @AuthenticationPrincipal
            Usuario usuario
    ) {

        return favoritoService.listar(
                usuario
        );
    }


    @PostMapping("/{unidadeId}")
    public SituacaoUnidadeResponseDTO adicionar(
            @AuthenticationPrincipal
            Usuario usuario,

            @PathVariable
            Long unidadeId
    ) {

        return favoritoService.adicionar(
                usuario,
                unidadeId
        );
    }


    @DeleteMapping("/{unidadeId}")
    public ResponseEntity<Void> remover(
            @AuthenticationPrincipal
            Usuario usuario,

            @PathVariable
            Long unidadeId
    ) {

        favoritoService.remover(
                usuario,
                unidadeId
        );


        return ResponseEntity
                .noContent()
                .build();
    }
}
