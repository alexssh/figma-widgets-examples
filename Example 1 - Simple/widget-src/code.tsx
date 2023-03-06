const { widget } = figma
const { Frame, AutoLayout, Ellipse, Input, useSyncedState, usePropertyMenu } = widget

function Widget() {
  const [state, setState] = useSyncedState(
    "state", 
    {
      color: "#000000",
      title: "Hello there!"
    }
  )
  
  usePropertyMenu([
    {
      itemType: 'color-selector',
      propertyName: 'colors',
      tooltip: 'Color selector',
      selectedOption: state.color,
      options: [
        {option: "#e06666", tooltip: "Red"}, 
        {option: "#ffe599", tooltip: "Yellow"},
        {option: "#00FF00", tooltip: "Blue"} 
      ],
    },
  ], ({propertyName, propertyValue}) => {
    setState({
      ...state,
      color: propertyValue as string
    })
  })

  return <AutoLayout
    fill={"#FFFFFF"}
    cornerRadius={8}
    direction={"vertical"}
    padding={24}
    spacing={24}
    horizontalAlignItems={"center"}
    verticalAlignItems={"center"}
    width={200}
    height={200}
    effect={{
      type: "drop-shadow",
      color: {
        r: 0,
        g: 0,
        b: 0,
        a: 0.24
      },
      blur: 4,
      offset: {
        x: 0,
        y: 2
      }
    }}
  >
    <Ellipse
      fill={state.color}
      width={72}
      height={72}
    />
    <AutoLayout
      width={"fill-parent"}
      stroke={"#CCCCCC"}
      strokeWidth={1}
      cornerRadius={4}
      padding={8}
    >
      <Input
        fontSize={14}
        width={"fill-parent"}
        onTextEditEnd={(event) => {
          console.log(event)
          setState({
            ...state,
            title: event.characters
          })
        }}
        value={state.title}
        hoverStyle={{
          fill: "#0000FF"
        }}
      />
    </AutoLayout>
  </AutoLayout>
}

widget.register(Widget)
