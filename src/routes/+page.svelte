<svelte:head>
	<title>Media Converter</title>
</svelte:head>
<script lang='ts'>
	import ConvertedFile from '../components/ConvertedFile.svelte';
	import { FileTypes } from '../components/FileTypes';

	let file: File;
	let fileExtension: FileTypes;
	let readyForConversion = false;

</script>
<div class='container-fluid'>
	<h1>Media Converter</h1>
	<label class='btn btn-lg btn-success shadow'>
		<span>Datei wählen</span>
		<input hidden class='btn' type='file' on:change='{(e) => file = e.target.files?.item(0)}' name='' id=''>
	</label>
	<label>
		<span>Ziel Format wählen</span>
		<select on:change={(e) =>  fileExtension = e.target.value } name='filetype' id='filetype'>
			<option disabled selected value>Formate</option>
			{#each Object.entries(FileTypes) as [key, value]}
				<option value='{value}'>{key}</option>
			{/each}
		</select>
	</label>


	{#if fileExtension && file}
		{fileExtension}
		<button on:click={() => readyForConversion = true} class='btn btn-dark'>Konvertieren</button>
	{/if}


	{#if readyForConversion}
		<ConvertedFile file='{file}' fileExt='{fileExtension}' />
	{/if}
</div>


<style lang='scss'>
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
      margin: 1em;
      display: flex;
      width: 66%;
      flex-direction: column;
      text-align: center;

    }

    video {
      width: 100%;
      height: auto;
    }
  }

</style>

