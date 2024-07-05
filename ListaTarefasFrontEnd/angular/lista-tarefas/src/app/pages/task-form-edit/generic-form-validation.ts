import { FormGroup } from '@angular/forms';

export class GenericValidator {
    constructor(private validationMessages: ValidationMessages) { }

    processMessages(container: FormGroup): DisplayMessage {
        const messages: DisplayMessage = {};

        // Recursivamente processa as mensagens para todos os controles no FormGroup
        this.processControlMessages(container, messages);

        return messages;
    }

    private processControlMessages(container: FormGroup, messages: DisplayMessage): void {
        for (const controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                let c = container.get(controlKey);

                if (c instanceof FormGroup) {
                    // Se o controle é um FormGroup, chama recursivamente processControlMessages
                    this.processControlMessages(c, messages);
                } else {
                    // Verifica se existem mensagens de validação definidas para o controle
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = '';

                        // Verifica se o controle foi tocado (touched) ou alterado (dirty) e tem erros
                        if ((c?.dirty || c?.touched) && c?.errors) {
                            Object.keys(c.errors).forEach(errorKey => {
                                // Verifica se há mensagem de validação definida para o erro específico
                                if (this.validationMessages[controlKey][errorKey]) {
                                    messages[controlKey] += this.validationMessages[controlKey][errorKey] + '<br />';
                                }
                            });
                        }
                    }
                }
            }
        }
    }
}

// Definição das interfaces para tipos utilizados
export interface DisplayMessage {
    [key: string]: string;
}

export interface ValidationMessages {
    [key: string]: { [key: string]: string };
}
