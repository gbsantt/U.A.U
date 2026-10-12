package com.uau.backend.controller;

import com.uau.backend.dto.AtualizarUsuarioRequestDTO;
import com.uau.backend.dto.CadastroUsuarioRequestDTO;
import com.uau.backend.dto.EsqueciSenhaRequestDTO;
import com.uau.backend.dto.LoginRequestDTO;
import com.uau.backend.dto.LoginResponseDTO;
import com.uau.backend.dto.RedefinirSenhaRequestDTO;
import com.uau.backend.dto.UsuarioRequestDTO;
import com.uau.backend.dto.UsuarioResponseDTO;
import com.uau.backend.dto.VerificarCodigoRequestDTO;

import com.uau.backend.entity.Usuario;

import com.uau.backend.service.UsuarioService;

import jakarta.validation.Valid;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @GetMapping("/me")
    public com.uau.backend.dto.UsuarioResponseDTO me(@AuthenticationPrincipal Usuario usuario) {
        return usuarioService.buscarUsuarioPorId(usuario.getId());
    }

    private final UsuarioService usuarioService;


    public UsuarioController(
            UsuarioService usuarioService
    ) {

        this.usuarioService =
                usuarioService;
    }


    /*
     * =========================================================
     * ADMIN - LISTAR USUÁRIOS
     * =========================================================
     */
    @GetMapping
    public List<UsuarioResponseDTO> listarUsuarios() {

        return usuarioService
                .listarUsuarios();
    }


    /*
     * =========================================================
     * ADMIN - BUSCAR USUÁRIO
     * =========================================================
     */
    @GetMapping("/{id}")
    public UsuarioResponseDTO buscarUsuario(
            @PathVariable Long id
    ) {

        return usuarioService
                .buscarUsuarioPorId(
                        id
                );
    }


    /*
     * =========================================================
     * ADMIN - CADASTRAR USUÁRIO
     * =========================================================
     */
    @PostMapping
    public UsuarioResponseDTO cadastrarUsuario(

            @Valid
            @RequestBody
            UsuarioRequestDTO dto

    ) {

        return usuarioService
                .cadastrarUsuario(
                        dto
                );
    }


    /*
     * =========================================================
     * ADMIN - ATUALIZAR USUÁRIO
     * =========================================================
     */
    @PutMapping("/{id}")
    public UsuarioResponseDTO atualizarUsuario(

            @PathVariable Long id,

            @Valid
            @RequestBody
            AtualizarUsuarioRequestDTO dto,

            @AuthenticationPrincipal
            Usuario adminLogado

    ) {

        return usuarioService
                .atualizarUsuario(
                        id,
                        dto,
                        adminLogado
                );
    }


    /*
     * =========================================================
     * CADASTRO PÚBLICO DO APP
     * =========================================================
     */
    @PostMapping("/cadastro")
    public UsuarioResponseDTO cadastrarUsuarioComum(

            @Valid
            @RequestBody
            CadastroUsuarioRequestDTO dto

    ) {

        return usuarioService
                .cadastrarUsuarioComum(
                        dto
                );
    }


    /*
     * =========================================================
     * LOGIN
     * =========================================================
     */
    @PostMapping("/login")
    public LoginResponseDTO login(

            @Valid
            @RequestBody
            LoginRequestDTO dto

    ) {

        return usuarioService
                .login(
                        dto
                );
    }


    /*
     * =========================================================
     * SOLICITAR RECUPERAÇÃO DE SENHA
     * =========================================================
     */
    @PostMapping("/esqueci-senha")
    public String esqueciSenha(

            @Valid
            @RequestBody
            EsqueciSenhaRequestDTO dto

    ) {

        return usuarioService
                .solicitarRecuperacaoSenha(
                        dto
                );
    }


    /*
     * =========================================================
     * VERIFICAR CÓDIGO
     * =========================================================
     */
    @PostMapping("/verificar-codigo")
    public void verificarCodigo(

            @Valid
            @RequestBody
            VerificarCodigoRequestDTO dto

    ) {

        usuarioService
                .verificarCodigoRecuperacao(
                        dto
                );
    }


    /*
     * =========================================================
     * REDEFINIR SENHA
     * =========================================================
     */
    @PostMapping("/redefinir-senha")
    public void redefinirSenha(

            @Valid
            @RequestBody
            RedefinirSenhaRequestDTO dto

    ) {

        usuarioService
                .redefinirSenha(
                        dto
                );
    }
}
