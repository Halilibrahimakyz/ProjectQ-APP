const validationRules = {
    step1: {
        field1: {
            required: true,
            minLength: 3,
            messages: {
                required: "Field 1 is required",
                minLength: "Field 1 must be at least 3 characters",
            },
        },
        field2: {
            required: true,
            minLength: 5,
            messages: {
                required: "Field 2 is required",
                minLength: "Field 2 must be at least 5 characters",
            },
        },
    },
    step2: {
        field1: {
            required: true,
            minLength: 2,
            messages: {
                required: "Field 1 is required",
                minLength: "Field 1 must be at least 2 characters",
            },
        },
        field2: {
            required: true,
            messages: {
                required: "Field 2 is required",
            },
        },
    },
    // Diğer adımlar için kurallar...
};

export default validationRules;
