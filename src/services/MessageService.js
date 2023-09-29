import meta from "./meta";

const MessageService = {
    enviarMensajeTexto: (datos) => {
        return meta.post("/messages", {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "59173277937",
            "type": "text",
            "text": { // the text object
              "preview_url": false,
              "body": "Hola desde React"
              }
          });
    },
}

export default MessageService;