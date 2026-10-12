package com.uau.backend.dto;
public record CredencialCameraResponseDTO(DispositivoResponseDTO dispositivo,String cameraKey) {
    @Override public String toString() { return "CredencialCameraResponseDTO[redacted]"; }
}
