(function (React) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const RoleSelect = () => {
    const [selectedRole, setSelectedRole] = React.useState(undefined);
    const options = [{
      label: 'Кастом',
      value: 'ADMIN'
    }, {
      label: 'Пользователь',
      value: 'USER'
    }, {
      label: 'Менеджер',
      value: 'MANAGER'
    }];
    const handleChange = event => {
      setSelectedRole(event.target.value);
    };
    return /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("label", {
      htmlFor: "roleSelect"
    }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u043E\u043B\u044C:"), /*#__PURE__*/React__default.default.createElement("select", {
      id: "roleSelect",
      value: selectedRole,
      onChange: handleChange
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "",
      disabled: true
    }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u043E\u043B\u044C"), options.map(option => /*#__PURE__*/React__default.default.createElement("option", {
      key: option.value,
      value: option.value
    }, option.label))), /*#__PURE__*/React__default.default.createElement("p", null, "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u0440\u043E\u043B\u044C: ", selectedRole));
  };

  // import React, { useState } from 'react';
  // // import { Role } from '@prisma/client';

  // const RoleSelect = async () => {
  //   const { Select } = await import('@adminjs/design-system');

  //   const [selectedRole, setSelectedRole] = useState();
  //   console.log('selectedRole: ', selectedRole);

  //   const options = [{ label: 'кастом', value: 'ADMIN' }];

  //   return (
  //     <Select
  //       value={selectedRole}
  //       onChange={(selected) => setSelectedRole(selected)}
  //       options={options}
  //     />
  //   );
  // };

  // export default RoleSelect;

  // import React, { useState } from 'react';
  // import { Role } from '@prisma/client';

  // const RoleSelect = async ({ role }: { role: Role }) => {
  //   console.log('role: ', role);
  //   const { Select } = await import('@adminjs/design-system');

  //   const [selectedRole, setSelectedRole] = useState();

  //   const options = [
  //     { label: 'Admin', value: 'ADMIN' },
  //     { label: 'Client', value: 'CLIENT' },
  //   ];
  //   //   const options = getAvailableRolesForUser(role);

  //   return (
  //     <Select
  //       value={selectedRole}
  //       onChange={(selected) => setSelectedRole(selected)}
  //       options={options}
  //     />
  //   );
  // };

  // export default RoleSelect;

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.RoleSelect = RoleSelect;

})(React);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW5qcy9jb21wb25lbnRzL3JvbGUtc2VsZWN0LnRzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IFJvbGVTZWxlY3Q6IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtzZWxlY3RlZFJvbGUsIHNldFNlbGVjdGVkUm9sZV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCB1bmRlZmluZWQ+KFxyXG4gICAgdW5kZWZpbmVkLFxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wdGlvbnMgPSBbXHJcbiAgICB7IGxhYmVsOiAn0JrQsNGB0YLQvtC8JywgdmFsdWU6ICdBRE1JTicgfSxcclxuICAgIHsgbGFiZWw6ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70YwnLCB2YWx1ZTogJ1VTRVInIH0sXHJcbiAgICB7IGxhYmVsOiAn0JzQtdC90LXQtNC20LXRgCcsIHZhbHVlOiAnTUFOQUdFUicgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxTZWxlY3RFbGVtZW50PikgPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWRSb2xlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxsYWJlbCBodG1sRm9yPVwicm9sZVNlbGVjdFwiPtCS0YvQsdC10YDQuNGC0LUg0YDQvtC70Yw6PC9sYWJlbD5cclxuICAgICAgPHNlbGVjdCBpZD1cInJvbGVTZWxlY3RcIiB2YWx1ZT17c2VsZWN0ZWRSb2xlfSBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfT5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQ+XHJcbiAgICAgICAgICDQktGL0LHQtdGA0LjRgtC1INGA0L7Qu9GMXHJcbiAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAge29wdGlvbnMubWFwKChvcHRpb24pID0+IChcclxuICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb24udmFsdWV9IHZhbHVlPXtvcHRpb24udmFsdWV9PlxyXG4gICAgICAgICAgICB7b3B0aW9uLmxhYmVsfVxyXG4gICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8cD7QktGL0LHRgNCw0L3QvdCw0Y8g0YDQvtC70Yw6IHtzZWxlY3RlZFJvbGV9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvbGVTZWxlY3Q7XHJcblxyXG4vLyBpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbi8vIC8vIGltcG9ydCB7IFJvbGUgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcblxyXG4vLyBjb25zdCBSb2xlU2VsZWN0ID0gYXN5bmMgKCkgPT4ge1xyXG4vLyAgIGNvbnN0IHsgU2VsZWN0IH0gPSBhd2FpdCBpbXBvcnQoJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nKTtcclxuXHJcbi8vICAgY29uc3QgW3NlbGVjdGVkUm9sZSwgc2V0U2VsZWN0ZWRSb2xlXSA9IHVzZVN0YXRlKCk7XHJcbi8vICAgY29uc29sZS5sb2coJ3NlbGVjdGVkUm9sZTogJywgc2VsZWN0ZWRSb2xlKTtcclxuXHJcbi8vICAgY29uc3Qgb3B0aW9ucyA9IFt7IGxhYmVsOiAn0LrQsNGB0YLQvtC8JywgdmFsdWU6ICdBRE1JTicgfV07XHJcblxyXG4vLyAgIHJldHVybiAoXHJcbi8vICAgICA8U2VsZWN0XHJcbi8vICAgICAgIHZhbHVlPXtzZWxlY3RlZFJvbGV9XHJcbi8vICAgICAgIG9uQ2hhbmdlPXsoc2VsZWN0ZWQpID0+IHNldFNlbGVjdGVkUm9sZShzZWxlY3RlZCl9XHJcbi8vICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbi8vICAgICAvPlxyXG4vLyAgICk7XHJcbi8vIH07XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBSb2xlU2VsZWN0O1xyXG5cclxuLy8gaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG4vLyBpbXBvcnQgeyBSb2xlIH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xyXG5cclxuLy8gY29uc3QgUm9sZVNlbGVjdCA9IGFzeW5jICh7IHJvbGUgfTogeyByb2xlOiBSb2xlIH0pID0+IHtcclxuLy8gICBjb25zb2xlLmxvZygncm9sZTogJywgcm9sZSk7XHJcbi8vICAgY29uc3QgeyBTZWxlY3QgfSA9IGF3YWl0IGltcG9ydCgnQGFkbWluanMvZGVzaWduLXN5c3RlbScpO1xyXG5cclxuLy8gICBjb25zdCBbc2VsZWN0ZWRSb2xlLCBzZXRTZWxlY3RlZFJvbGVdID0gdXNlU3RhdGUoKTtcclxuXHJcbi8vICAgY29uc3Qgb3B0aW9ucyA9IFtcclxuLy8gICAgIHsgbGFiZWw6ICdBZG1pbicsIHZhbHVlOiAnQURNSU4nIH0sXHJcbi8vICAgICB7IGxhYmVsOiAnQ2xpZW50JywgdmFsdWU6ICdDTElFTlQnIH0sXHJcbi8vICAgXTtcclxuLy8gICAvLyAgIGNvbnN0IG9wdGlvbnMgPSBnZXRBdmFpbGFibGVSb2xlc0ZvclVzZXIocm9sZSk7XHJcblxyXG4vLyAgIHJldHVybiAoXHJcbi8vICAgICA8U2VsZWN0XHJcbi8vICAgICAgIHZhbHVlPXtzZWxlY3RlZFJvbGV9XHJcbi8vICAgICAgIG9uQ2hhbmdlPXsoc2VsZWN0ZWQpID0+IHNldFNlbGVjdGVkUm9sZShzZWxlY3RlZCl9XHJcbi8vICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbi8vICAgICAvPlxyXG4vLyAgICk7XHJcbi8vIH07XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBSb2xlU2VsZWN0O1xyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBSb2xlU2VsZWN0IGZyb20gJy4uL3NyYy9hZG1pbmpzL2NvbXBvbmVudHMvcm9sZS1zZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJvbGVTZWxlY3QgPSBSb2xlU2VsZWN0Il0sIm5hbWVzIjpbIlJvbGVTZWxlY3QiLCJzZWxlY3RlZFJvbGUiLCJzZXRTZWxlY3RlZFJvbGUiLCJ1c2VTdGF0ZSIsInVuZGVmaW5lZCIsIm9wdGlvbnMiLCJsYWJlbCIsInZhbHVlIiwiaGFuZGxlQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJodG1sRm9yIiwiaWQiLCJvbkNoYW5nZSIsImRpc2FibGVkIiwibWFwIiwib3B0aW9uIiwia2V5IiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBRUEsTUFBTUEsVUFBb0IsR0FBR0EsTUFBTTtJQUNqQyxNQUFNLENBQUNDLFlBQVksRUFBRUMsZUFBZSxDQUFDLEdBQUdDLGNBQVEsQ0FDOUNDLFNBQ0YsQ0FBQyxDQUFBO0lBRUQsTUFBTUMsT0FBTyxHQUFHLENBQ2Q7RUFBRUMsSUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRUMsSUFBQUEsS0FBSyxFQUFFLE9BQUE7RUFBUSxHQUFDLEVBQ25DO0VBQUVELElBQUFBLEtBQUssRUFBRSxjQUFjO0VBQUVDLElBQUFBLEtBQUssRUFBRSxNQUFBO0VBQU8sR0FBQyxFQUN4QztFQUFFRCxJQUFBQSxLQUFLLEVBQUUsVUFBVTtFQUFFQyxJQUFBQSxLQUFLLEVBQUUsU0FBQTtFQUFVLEdBQUMsQ0FDeEMsQ0FBQTtJQUVELE1BQU1DLFlBQVksR0FBSUMsS0FBMkMsSUFBSztFQUNwRVAsSUFBQUEsZUFBZSxDQUFDTyxLQUFLLENBQUNDLE1BQU0sQ0FBQ0gsS0FBSyxDQUFDLENBQUE7S0FDcEMsQ0FBQTtFQUVELEVBQUEsb0JBQ0VJLHNCQUFBLENBQUFDLGFBQUEsQ0FDRUQsS0FBQUEsRUFBQUEsSUFBQUEsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUFPQyxJQUFBQSxPQUFPLEVBQUMsWUFBQTtFQUFZLEdBQUEsRUFBQyw0RUFBcUIsQ0FBQyxlQUNsREYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRRSxJQUFBQSxFQUFFLEVBQUMsWUFBWTtFQUFDUCxJQUFBQSxLQUFLLEVBQUVOLFlBQWE7RUFBQ2MsSUFBQUEsUUFBUSxFQUFFUCxZQUFBQTtLQUNyREcsZUFBQUEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRTCxJQUFBQSxLQUFLLEVBQUMsRUFBRTtNQUFDUyxRQUFRLEVBQUEsSUFBQTtLQUFDLEVBQUEsMkVBRWxCLENBQUMsRUFDUlgsT0FBTyxDQUFDWSxHQUFHLENBQUVDLE1BQU0saUJBQ2xCUCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO01BQVFPLEdBQUcsRUFBRUQsTUFBTSxDQUFDWCxLQUFNO01BQUNBLEtBQUssRUFBRVcsTUFBTSxDQUFDWCxLQUFBQTtFQUFNLEdBQUEsRUFDNUNXLE1BQU0sQ0FBQ1osS0FDRixDQUNULENBQ0ssQ0FBQyxlQUNUSyxzQkFBQSxDQUFBQyxhQUFBLENBQUcsR0FBQSxFQUFBLElBQUEsRUFBQSxtRkFBZ0IsRUFBQ1gsWUFBZ0IsQ0FDakMsQ0FBQyxDQUFBO0VBRVYsQ0FBQyxDQUFBOztFQUlEO0VBQ0E7O0VBRUE7RUFDQTs7RUFFQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQ25GQW1CLE9BQU8sQ0FBQ0MsY0FBYyxHQUFHLEVBQUUsQ0FBQTtFQUUzQkQsT0FBTyxDQUFDQyxjQUFjLENBQUNyQixVQUFVLEdBQUdBLFVBQVU7Ozs7OzsifQ==
