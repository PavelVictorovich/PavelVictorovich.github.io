import { View } from 'backbone';

const PopupView = View.extend({
    initialize: function () {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    },
    closePopUp: function () {
        this.$el.find('#regform')
            .modal('hide');
    },
    render: function () {
        this.$el.html(this.template);
        this.$el.find('[role="dialog"]')
            .modal('show')
            .on('hide.bs.modal', () => this.remove());
    }
});

export default PopupView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvdmlldy9wb3B1cFZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lJztcblxuY29uc3QgUG9wdXBWaWV3ID0gVmlldy5leHRlbmQoe1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNsb3NlUG9wVXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kZWwuZmluZCgnI3JlZ2Zvcm0nKVxuICAgICAgICAgICAgLm1vZGFsKCdoaWRlJyk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKTtcbiAgICAgICAgdGhpcy4kZWwuZmluZCgnW3JvbGU9XCJkaWFsb2dcIl0nKVxuICAgICAgICAgICAgLm1vZGFsKCdzaG93JylcbiAgICAgICAgICAgIC5vbignaGlkZS5icy5tb2RhbCcsICgpID0+IHRoaXMucmVtb3ZlKCkpO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBQb3B1cFZpZXc7Il0sImZpbGUiOiJCYWNrYm9uZS9zcmMvdmlldy9wb3B1cFZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
