package com.uau.backend.controller;

import com.uau.backend.service.GeocodificacaoService;
import com.uau.backend.exception.ApiException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/geocodificacao")
public class GeocodificacaoController {
    private final GeocodificacaoService service;
    public GeocodificacaoController(GeocodificacaoService service) { this.service=service; }
    @GetMapping("/sugestoes")
    public GeocodificacaoService.ResultadoBusca sugestoes(@RequestParam String endereco) {
        if(endereco.trim().length()<5 || endereco.length()>300)
            throw new ApiException(400,"ENDERECO_INVALIDO","Informe um endereço entre 5 e 300 caracteres ou um CEP com 8 dígitos.");
        return service.pesquisarOpcoes(endereco);
    }
    @GetMapping
    public GeocodificacaoService.Coordenadas pesquisar(@RequestParam String endereco) {
        if(endereco.trim().length()<5 || endereco.length()>300)
            throw new ApiException(400,"ENDERECO_INVALIDO","Informe um endereço entre 5 e 300 caracteres ou um CEP com 8 dígitos.");
        return service.pesquisar(endereco);
    }
}
