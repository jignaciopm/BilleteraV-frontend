<template>
    <div>
        <b-form-group>
            <template v-slot:label>
                <b-form-checkbox
                    v-model="allSelected"
                    :indeterminate="indeterminate"
                    :aria-describedby="name"
                    :aria-controls="name"
                    @change="toggleAll">
                    {{ allSelected ? unSelectAll : selectAll }}
                </b-form-checkbox>
            </template>

            <b-form-checkbox-group
                :id="name"
                v-model="selected"
                :options="options"
                :name="name"
                class="ml-4"
                aria-label="Individual"
                stacked />
        </b-form-group>
    </div>
</template>

<script>

export default {
    name: 'select-all',
    props: {
        name: { type: String, required: true },
        selectAll: { 
            type: String, 
            default: function() {
                return 'Select All'
            }
        },
        unSelectAll: { 
            type: String, 
            default: function() {
                return 'Un-select All'
            }
        },
        options: { type: Array, required: true },
        selected: { type: Array, required: true },
        indeterminate: { type: Boolean },
        allSelected: { type: Boolean }
    },
    methods: {
        toggleAll(checked) {
            this.selected = checked ? this.options.slice() : []
        }
    },
    watch: {
        selected: function(newVal, oldVal) {
            // Handle changes in individual flavour checkboxes
            if (newVal.length === 0) {
                this.indeterminate = false
                this.allSelected = false
            } else if (newVal.length === this.options.length) {
                this.indeterminate = false
                this.allSelected = true
            } else {
                this.indeterminate = true
                this.allSelected = false
            }
            
            this.$emit('update:allSelected', this.allSelected)
            this.$emit('update:indeterminate', this.indeterminate)
            this.$emit('update:selected', newVal)
        }
    }
};
</script>
