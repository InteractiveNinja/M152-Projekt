<script lang="ts">
    import {onMount} from "svelte";

    export let file: File;
    let convertedVideoUrl;

    import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg'

    const ffmpeg = createFFmpeg({log: true});

    async function convertFile(file: File) {
        await ffmpeg.load();
        ffmpeg.FS('writeFile', "test.mp4", await fetchFile(file))
        await ffmpeg.run('-i', 'test.mp4', 'out.mp3');

        const data = ffmpeg.FS('readFile', 'out.mp3')

        convertedVideoUrl = URL.createObjectURL(new Blob([data.buffer], {type: 'audio/mp3'}))

    }

    onMount(async () => {
        if (file) {
            await convertFile(file);
        }
    });
</script>

{#if convertedVideoUrl}
    <p>Output Video</p>
    <video controls>
        <source src="{convertedVideoUrl}" type="video/mp4">
    </video>
{/if}

