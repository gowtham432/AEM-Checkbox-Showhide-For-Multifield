(function(document, $) {
    "use strict";

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        // if there is already an inital value make sure the according target element becomes visible
        checkboxShowHideHandler($(".cq-dialog-checkbox-showhide", e.target), true);
    });

    $(document).on("change", ".cq-dialog-checkbox-showhide", function(e) {
        checkboxShowHideHandler($(this), false);
    });

    function checkboxShowHideHandler(el, flag) {
        el.each(function(i, element) {
            if ($(element).is("coral-checkbox")) {
                Coral.commons.ready(element, function(component) {
                    showHide(component, element, flag);
                    component.on("change", function() {
                        showHide(component, element, flag);
                    });
                });
            } else {
                var component = $(element).data("checkbox");
                if (component) {
                    showHide(component, element, flag);
                }
            }
        })
    }

    function showHide(component, element, flag) {
        var target = $(element).data("cqDialogCheckboxShowhideTarget");
        var $target = $(target);
        var elementIndex = $(element).closest('coral-multifield-item').index();

        if (target) {
            var value;
            if (component.value) {
                value = component.value;
            } else {
                value = component.getValue();
            }
            $target.each(function(index) {
                var tarIndex = $(this).closest('coral-multifield-item').index();
                if (elementIndex === tarIndex) {
                    $(this).addClass("hide");

                    if (component.checked) {
                        $(this).removeClass("hide");
                        if (!flag) {
                            $(this).find('input.coral-Form-field.coral-Textfield')[0].value = '';
                        }

                    }
                } else if (elementIndex !== tarIndex) {
                    var checked = $(this).closest('coral-multifield-item').find('coral-checkbox')[0].checked;
                    if (checked) {
                        $(this).removeClass("hide");
                    }
                }
            });
        }
    }
})(document, Granite.$);