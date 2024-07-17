
<script lang="ts">

    export let color :string
    const currentTime = new Date()
    const currentHour = currentTime.getHours()

    let greeting: string = ''

    if(currentHour < 12) {
        greeting = 'Buenos Dias'
    }
    else if(currentHour > 12) {
        greeting = 'Buenos Tardes'
    }
    else {
        greeting = 'Buenos Noches'
    }
 </script>

 <h2 class="text-2xl font-bold text-[{color}]">
    {greeting}
 </h2>