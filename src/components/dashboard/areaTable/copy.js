
const clipboard = FlowbiteInstances.getInstance('CopyClipboard', 'npm-install-copy-button');
const tooltip = FlowbiteInstances.getInstance('Tooltip', 'tooltip-copy-npm-install-copy-button');

const $defaultIcon = document.getElementById('default-icon');
const $successIcon = document.getElementById('success-icon');

const $defaultTooltipMessage = document.getElementById('default-tooltip-message');
const $successTooltipMessage = document.getElementById('success-tooltip-message');

clipboard.updateOnCopyCallback((clipboard) => {
    showSuccess();
    setTimeout(() => {
        resetToDefault();
    }, 2000);
})

const showSuccess = () => {
    $defaultIcon.classList.add('hidden');
    $successIcon.classList.remove('hidden');
    $defaultTooltipMessage.classList.add('hidden');
    $successTooltipMessage.classList.remove('hidden');    
    tooltip.show();
}

const resetToDefault = () => {
    $defaultIcon.classList.remove('hidden');
    $successIcon.classList.add('hidden');
    $defaultTooltipMessage.classList.remove('hidden');
    $successTooltipMessage.classList.add('hidden');
    tooltip.hide();
}
