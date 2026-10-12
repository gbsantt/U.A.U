package com.uau.backend.exception;

public class DispositivoNaoAutorizadoException extends RuntimeException {

    public DispositivoNaoAutorizadoException(String mensagem) {
        super(mensagem);
    }
}