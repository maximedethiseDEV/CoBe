package com.cobe.api.config.exception;

public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }

    public static class MissingContactException extends BusinessException {
        public MissingContactException(String message) {
            super(message);
        }
    }

    public static class MailSendingException extends BusinessException {
        public MailSendingException(String message, Throwable cause) {
            super(message);
            initCause(cause);
        }
    }
}
