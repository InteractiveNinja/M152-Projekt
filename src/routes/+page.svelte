<svelte:head>
    <title>Media Converter</title>
</svelte:head>
<script lang="ts">
    import ConvertedFile from "../components/ConvertedFile.svelte";

    let file: File;

</script>
<div class="container-fluid">
    <h1>Media Converter</h1>
    <label class="shadow">
        <span>Datei wählen</span>
        <input hidden class="btn" type="file" on:change="{(e) => file = e.target.files?.item(0)}" name="" id="">
    </label>

    {#if file}
        <p>Source Video</p>
        <video controls>
            <source src="{URL.createObjectURL(file)}" type="{file.type}">
        </video>
        <ConvertedFile file="{file}"/>
    {/if}
</div>


<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1, p {
      text-align: center;
      font-size: 2em;
    }

    label {
      display: flex;
      flex-direction: column;
      background: var(--bs-success);
      border-radius: 1em;
      width: 66%;
      span {
        font-size: 1.5em;
        padding: 0;
        margin: .3em;
        text-align: center;
      }
    }

    input[type=file] {
      color: var(--bs-white);
    }

    video {
      width: 100%;
      height: auto;
    }
  }

</style>

