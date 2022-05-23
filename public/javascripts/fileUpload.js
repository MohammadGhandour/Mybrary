const rootStytles = window.getComputedStyle(document.documentElement);

if (rootStytles.getPropertyValue('--book-cover-width-large') != null && 
    rootStytles.getPropertyValue('--book-cover-width-large') !== '') {
    ready()
} else {
    document.getElementById('main-css').addEventListener('load', ready)
}

function ready() {
    const coverWidth = parseFloat(rootStytles.getPropertyValue('--book-cover-width-large'));
    const coverAspectRatio = parseFloat(rootStytles.getPropertyValue('--book-cover-aspect-ratio'));
    const coverHeight = parseFloat(coverWidth / coverAspectRatio);

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    )
    
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight
    })
    
    FilePond.parse(document.body);
}