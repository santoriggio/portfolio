import { useEffect, useState } from "react";
import { Screen } from "@/components/_shared/Screen";
import { Typography } from "@/components/_shared/Typography";
import { useAppTheme } from "@/hooks";
import { Image } from "expo-image";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import * as Linking from "expo-linking";
import * as MailComposer from "expo-mail-composer";
import { Icon } from "@/components/_shared/Icon";

export default function IndexPage() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  console.log(theme.colors.card);

  const isSmall = width < 700 + theme.spacing.xl * 3;

  const openLinkedin = async () => {
    Linking.openURL("https://www.linkedin.com/in/santoriggio");
  };
  const openGithub = async () => {
    Linking.openURL("https://github.com/santoriggio");
  };
  const writeEmail = async () => {
    MailComposer.composeAsync({
      recipients: ["info@santoriggio.it"],
    });
  };

  return (
    <Screen headerShown={false} title="Portfolio">
      <ScrollView contentContainerStyle={{ padding: theme.spacing.xl }}>
        <ParticleBackground />
        <View
          style={{
            alignItems: "center",
            flexDirection: isSmall ? "column" : "row",
            justifyContent: "space-evenly",
            gap: theme.spacing.xl,
          }}
        >
          <View
            style={{
              alignItems: isSmall ? "center" : "flex-start",
              width: isSmall ? "100%" : 350,
            }}
          >
            <Typography
              size={isSmall ? "xl" : "xxl"}
              style={{
                textAlign: isSmall ? "center" : "left",
                fontFamily: "monospace",
              }}
            >
              Mi chiamo{" "}
              <Typography
                size={isSmall ? "xl" : "xxl"}
                color="primary"
                style={{ fontFamily: "monospace", fontWeight: "bold" }}
              >
                Santo
              </Typography>
              , sono un{" "}
              <Typography
                size={isSmall ? "xl" : "xxl"}
                color="primary"
                style={{ fontFamily: "monospace", fontWeight: "bold" }}
              >
                Software Developer
              </Typography>{" "}
              professionista specializzato nello sviluppo di{" "}
              <Typography
                size={isSmall ? "xl" : "xxl"}
                style={{ fontFamily: "monospace", fontWeight: "bold" }}
                color="primary"
              >
                applicazioni.
              </Typography>
            </Typography>
            <View
              style={{
                marginTop: theme.spacing.xl,
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.md,
              }}
            >
              <Pressable onPress={openLinkedin}>
                <Icon name="linkedin-square" />
              </Pressable>
              <Pressable onPress={openGithub}>
                <Icon name="github" family="AntDesign" />
              </Pressable>
              <Pressable onPress={writeEmail}>
                <Typography style={{ textDecorationLine: "underline" }}>
                  info@santoriggio.it
                </Typography>
              </Pressable>
            </View>
          </View>
          <Image
            source={require("assets/images/code.png")}
            contentFit="cover"
            style={{
              borderRadius: 10,
              maxWidth: 350,
              height: isSmall ? 400 : 480,
              width: isSmall ? 300 : 350,
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const { theme } = useAppTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <Particles
      id="tsparticles"
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push", // Aggiunge particelle al click
            },
            onHover: {
              enable: true,
              mode: "repulse", // Respinge particelle al passaggio
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme.colors.text,
          },
          links: {
            color: theme.colors.text,
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
