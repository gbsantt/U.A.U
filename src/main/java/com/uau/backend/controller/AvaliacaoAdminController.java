package com.uau.backend.controller;

import com.uau.backend.service.AvaliacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/avaliacoes")
public class AvaliacaoAdminController {
    private final AvaliacaoService avaliacoes;

    public AvaliacaoAdminController(AvaliacaoService avaliacoes) {
        this.avaliacoes = avaliacoes;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        avaliacoes.excluirAvaliacaoAdmin(id);
    }
}
