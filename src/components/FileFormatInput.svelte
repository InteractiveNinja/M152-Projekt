<script lang="ts">
    import { FileTypes } from '../types/FileTypes';
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    const fileFormatChoosen = (format: string) => {
        dispatch("fileformat", {
            format
        })
    }

</script>
<select
        class="form-select form-select-lg"
        on:change={(e) => (fileFormatChoosen(e.target?.value))}
        name="filetype"
        id="filetype"
>
    <option disabled selected value>Formate</option>
    {#each Object.entries(FileTypes) as [key, value]}
        <option {value}>{key}</option>
    {/each}
</select>