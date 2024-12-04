import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { WizardStore } from "./createWizard";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Typography } from "../Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/hooks";
import { Icon } from "../Icon";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { $styles, colors } from "@/theme";
import Button from "../Button/Button";

export const NativeWizard: FC<WizardStore> = ({
  steps,
  currentIndex,
  goNext,
  goPrev,
  data,
  setData,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const [isValid, setIsValid] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [stepWidth, setStepWidth] = useState<number>(0);
  const Content = steps[currentIndex].content;

  const gap = theme.spacing.sm;

  const gradientWidth = useMemo(() => {
    let counter = 0;

    for (let i = 0; i < currentIndex; i++) {
      if (!steps[i].hideInStepper) {
        counter++;
      }
    }

    const gapWidth = gap * counter;

    return stepWidth + stepWidth * counter + gapWidth - 43;
  }, [stepWidth, currentIndex, steps, gap]);

  const left = useMemo(() => {
    let counter = 0;

    for (let i = 0; i < currentIndex; i++) {
      if (!steps[i].hideInStepper) {
        counter++;
      }
    }

    const gapWidth = gap * counter;

    return stepWidth + stepWidth * counter - 45 + gapWidth;
  }, [stepWidth, currentIndex, steps, gap]);

  const jsonData = JSON.stringify(data[currentIndex]);

  const validate = useCallback(() => {
    const { schema } = steps[currentIndex];

    if (schema && typeof data[currentIndex] === "undefined") {
      return setIsValid(false);
    }

    if (schema) {
      const stepData = data[currentIndex];
      const { error } = schema.validate(stepData);

      if (error) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [currentIndex, data, steps]);

  useEffect(() => {
    validate();
  }, [jsonData, validate]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={footerHeight}
      style={{ flex: 1 }}
    >
      {!steps[currentIndex].hideStepper && (
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: theme.spacing.md,
            marginBottom: theme.spacing.md,
            height: 45,
          }}
          entering={SlideInUp}
          exiting={SlideOutUp}
        >
          <View
            style={{
              left: left + theme.spacing.md,
              zIndex: 1000,
              position: "absolute",
              width: 45,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              backgroundColor: theme.colors.primary,
            }}
          >
            <View
              style={{
                height: 35,
                aspectRatio: 1,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.background,
              }}
            >
              <Icon name={steps[currentIndex].icon} color="primary" size="xs" />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap,
              position: "relative",
              borderRadius: 10,
              alignItems: "center",
              overflow: "hidden",
              backgroundColor: "transparent",
            }}
          >
            <LinearGradient
              style={[
                $styles.absoluteFill,
                {
                  width: gradientWidth,
                  zIndex: 10,
                  borderRadius: 10,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  height: gap,
                },
              ]}
              colors={theme.gradients.logo}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
            />
            {steps.map((step, index) => {
              if (step.hideInStepper) return;
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    position: "relative",
                    borderRadius: 10,
                    zIndex: 9,
                    height: 12,
                    backgroundColor: theme.colors.card,
                  }}
                  onLayout={(event) => {
                    setStepWidth(event.nativeEvent.layout.width);
                  }}
                />
              );
            })}
          </View>
        </Animated.View>
      )}
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <Content
          data={data[currentIndex] || {}}
          set={(key, value) => {
            setData(currentIndex, key, value);
          }}
        />
      </ScrollView>
      <View
        onLayout={(e) => {
          setFooterHeight(e.nativeEvent.layout.height + theme.spacing.xs);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          marginBottom: bottom,
        }}
      >
        {currentIndex > 0 && (
          <TouchableOpacity
            activeOpacity={theme.activeOpacity.light}
            onPress={goPrev}
            style={{
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,
              backgroundColor: theme.colors.card,
              borderRadius: 1000,
              justifyContent: "center",
              marginRight: theme.spacing.md,
            }}
          >
            <Icon name="chevron-left" size="xl" />
          </TouchableOpacity>
        )}
        <Button
          active={isValid}
          onPress={() => {
            if (isValid) goNext();
          }}
          style={{ flex: 1 }}
        >
          Avanti
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
