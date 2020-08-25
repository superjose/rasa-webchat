export function isCarousel(message) {
  console.log("Is Carousel", message);
  return Object.keys(message).includes('attachment')
    && Object.keys(message.attachment).includes('type')
    && message.attachment.type === 'template'
    && Object.keys(message.attachment).includes('payload')
    && Object.keys(message.attachment.payload).indexOf('template_type') >= 0
    && message.attachment.payload.template_type === 'generic'
    && Object.keys(message.attachment.payload).indexOf('elements') >= 0
    && message.attachment.payload.elements.length > 0;
}

export function isVideo(message) {
  return Object.keys(message).includes('attachment')
    && Object.keys(message.attachment).includes('type')
    && message.attachment.type === 'video';
}

export function isImage(message) {
  return Object.keys(message).includes('attachment')
    && Object.keys(message.attachment).includes('type')
    && message.attachment.type === 'image';
}

export function isText(message) {
  return Object.keys(message).length === 1 && Object.keys(message).includes('text');
}

export function isButtons(message) {
  return Object.keys(message).length === 2
    && Object.keys(message).includes('text')
    && (Object.keys(message).includes('quick_replies') || Object.keys(message).includes('buttons'));
}

// I think this can be simplified to:
// message?.attachment?.payload?.elements?.type === "date_picker";
export function isDatepicker(message) {
  return message?.attachment?.payload?.elements?.type === "date_picker";
//   return Object.keys(message).includes('attachment') 
//     && Object.keys(message.attachment).includes('payload')
//     && Object.keys(message.attachment.payload).includes('elements')
//      && Object.keys(message.attachment.payload.elements).includes('type')
}