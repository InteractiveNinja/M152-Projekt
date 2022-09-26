<svelte:head>
	<title>Media Converter</title>
</svelte:head>
<script lang='ts'>
    import ConvertedFile from '../components/ConvertedFile.svelte';
    import {FileTypes} from '../types/FileTypes';
    import {isValideFile} from "../util/FileUtil";

    let sourceFile: File;
    let OutputFileExtension: FileTypes;
    let invalideInputFile = false;
    let readyForConversion = false;

    function validateFileInput(file: File): void {
        const isValide = isValideFile(file.name);
        if (isValide) {
            sourceFile = file;
            invalideInputFile = false;
        } else {
            invalideInputFile = true;
        }
    }

    function reset() {
        readyForConversion = false;
    }

</script>
<div class='container-fluid'>
	<h1>Media Converter</h1>
	<label class='btn btn-lg shadow {sourceFile ? "btn-success" : "btn-light"} big-btn'>
		<span>Datei wählen</span>
		<input hidden class='btn' type='file' on:change='{(e) => validateFileInput(e.target.files?.item(0))}' name=''
			   id=''>
	</label>
	<label class="container big-btn p-0">
		<p>Ziel Format wählen</p>
		<select class="form-select form-select-lg" on:change={(e) =>  OutputFileExtension = e.target.value }
				name='filetype' id='filetype'>
			<option disabled selected value>Formate</option>
			{#each Object.entries(FileTypes) as [key, value]}
				<option value='{value}'>{key}</option>
			{/each}
		</select>
	</label>

	{#if invalideInputFile}
		<span class="text-warning">Ausgewählte Datei ist nicht valide</span>
	{/if}

	{#if OutputFileExtension && sourceFile && !invalideInputFile}
		<button on:click={() => readyForConversion = true} class='btn btn-dark big-btn'>Konvertieren</button>
	{/if}


	{#if readyForConversion}
		<ConvertedFile reset="{reset}" file='{sourceFile}' fileExt='{OutputFileExtension}'/>
	{/if}
</div>


<style lang='scss'>

  // Global Styling
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  :global {
    body {
      font-family: 'Poppins', sans-serif;
      color: var(--bs-white);
      background-color: var(--bs-gray-dark);
    }

    .big-btn {
      margin: 1em;
      width: 66%;
    }

  }


  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1, p {
      text-align: center;
      font-size: 2em;
    }

    input, select {
      text-align: center;
      margin-top: 1em;

    }


    label {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    video {
      width: 100%;
      height: auto;
    }
  }

</style>

