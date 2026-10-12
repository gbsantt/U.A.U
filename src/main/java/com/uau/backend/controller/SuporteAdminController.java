package com.uau.backend.controller;
import com.uau.backend.dto.*;
import com.uau.backend.entity.*;
import com.uau.backend.service.SolicitacaoSuporteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/admin/suporte")
public class SuporteAdminController {
    private final SolicitacaoSuporteService service;
    public SuporteAdminController(SolicitacaoSuporteService service) { this.service=service; }
    @GetMapping public PaginaDTO<SolicitacaoSuporteResumoDTO> listar(
        @RequestParam(required=false) StatusSuporte status,@RequestParam(required=false) CategoriaSuporte categoria,
        @RequestParam(defaultValue="0") int page,@RequestParam(defaultValue="20") int size) {
        return service.listar(null,status,categoria,page,size);
    }
    @GetMapping("/{id}") public SolicitacaoSuporteAdminResponseDTO buscar(@PathVariable Long id) { return service.buscarAdmin(id); }
    @PatchMapping("/{id}/status") public SolicitacaoSuporteAdminResponseDTO atualizar(@PathVariable Long id,@Valid @RequestBody AtualizarStatusSuporteRequestDTO dto) { return service.atualizar(id,dto); }
}
