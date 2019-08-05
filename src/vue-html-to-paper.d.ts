// import Vue from 'vue'

declare module "vue-html-to-paper" {
    import { PluginFunction } from "vue"

    // See https://www.w3schools.com/Jsref/met_win_open.asp
    interface Options {
        name?: "_blank" | "_parent" | "_self" | "_top" | string
        specs?: string[]
        styles?: string[]
        replace?: boolean
    }
    export const install: PluginFunction<Options>

    module "vue/types/vue" {
        interface Vue {
            $htmlToPaper: (id: string, callback?: () => void) => void
        }
    }
}

// declare module 'vue/types/vue' {
//     interface Vue {
//         $htmlToPaper: (id: string, callback: () => void) => void
//     }
// }
