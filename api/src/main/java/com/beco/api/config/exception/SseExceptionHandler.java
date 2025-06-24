package com.beco.api.config.exception;

import com.beco.api.controller.AbstractCrudController;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.async.AsyncRequestNotUsableException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@RestControllerAdvice(assignableTypes = AbstractCrudController.class)
public class SseExceptionHandler {

    @ExceptionHandler(Exception.class)
    public SseEmitter handleSseException(Exception ex) {
        SseEmitter emitter = new SseEmitter();
        try {
            emitter.send(SseEmitter.event()
                    .name("error")
                    .data("Erreur SSE : " + ex.getMessage()));
            emitter.complete();
        } catch (IOException e) {
            emitter.completeWithError(e);
        }
        return emitter;
    }

    @ExceptionHandler(AsyncRequestNotUsableException.class)
    public void handleDisconnectedClient() {
    }
}
