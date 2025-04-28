import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  // State for toggle switches
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saveGameProgress, setSaveGameProgress] = useState(true);

  // List of available languages
  const languages = [
    { code: "en", name: "English", selected: true },
    { code: "es", name: "Español", selected: false },
    { code: "fr", name: "Français", selected: false },
    { code: "de", name: "Deutsch", selected: false },
    { code: "tr", name: "Türkçe", selected: false },
  ];

  // Selected language
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Setting sections with their items
  const settingSections = [
    {
      title: "Account",
      items: [
        {
          icon: <Ionicons name="person-outline" size={22} color="#4f46e5" />,
          title: "Profile",
          subtitle: "Edit your profile information",
          action: "navigate",
          destination: "/profile",
        },
        {
          icon: <MaterialIcons name="security" size={22} color="#4f46e5" />,
          title: "Security",
          subtitle: "Password and authentication",
          action: "navigate",
          destination: "/security",
        },
      ],
    },
    {
      title: "Gameplay",
      items: [
        {
          icon: (
            <MaterialCommunityIcons
              name="bell-outline"
              size={22}
              color="#4f46e5"
            />
          ),
          title: "Notifications",
          subtitle: "Game alerts and reminders",
          action: "toggle",
          state: notifications,
          setState: setNotifications,
        },
        {
          icon: (
            <Ionicons name="volume-medium-outline" size={22} color="#4f46e5" />
          ),
          title: "Sound Effects",
          subtitle: "Game sounds and music",
          action: "toggle",
          state: sounds,
          setState: setSounds,
        },
        {
          icon: (
            <MaterialCommunityIcons name="vibrate" size={22} color="#4f46e5" />
          ),
          title: "Vibration",
          subtitle: "Haptic feedback",
          action: "toggle",
          state: vibration,
          setState: setVibration,
        },
        {
          icon: <MaterialIcons name="save-alt" size={22} color="#4f46e5" />,
          title: "Save Game Progress",
          subtitle: "Auto-save unfinished games",
          action: "toggle",
          state: saveGameProgress,
          setState: setSaveGameProgress,
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          icon: <Ionicons name="moon-outline" size={22} color="#4f46e5" />,
          title: "Dark Mode",
          subtitle: "Switch between light and dark themes",
          action: "toggle",
          state: darkMode,
          setState: setDarkMode,
        },
        {
          icon: <MaterialIcons name="language" size={22} color="#4f46e5" />,
          title: "Language",
          subtitle: "Change app language",
          action: "navigate",
          destination: "/language",
          value: languages.find((lang) => lang.code === selectedLanguage)?.name,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: <MaterialIcons name="help-outline" size={22} color="#4f46e5" />,
          title: "Help & Support",
          subtitle: "FAQs and contact information",
          action: "navigate",
          destination: "/help",
        },
        {
          icon: (
            <MaterialCommunityIcons
              name="star-outline"
              size={22}
              color="#4f46e5"
            />
          ),
          title: "Rate the App",
          subtitle: "Tell us what you think",
          action: "navigate",
          destination: "/rate",
        },
        {
          icon: (
            <Ionicons name="document-text-outline" size={22} color="#4f46e5" />
          ),
          title: "Privacy Policy",
          subtitle: "How we handle your data",
          action: "navigate",
          destination: "/privacy",
        },
        {
          icon: <MaterialIcons name="info-outline" size={22} color="#4f46e5" />,
          title: "About",
          subtitle: "App version and information",
          action: "navigate",
          destination: "/about",
          value: "v1.0.0",
        },
      ],
    },
  ];

  // Render a setting item based on its type
  const renderSettingItem = (item, index, isLast) => {
    return (
      <TouchableOpacity
        key={index}
        className={`flex-row items-center py-4 ${
          !isLast ? "border-b border-slate-100" : ""
        }`}
        onPress={() => {
          if (item.action === "navigate") {
            router.push(item.destination);
          }
        }}
        disabled={item.action === "toggle"}
      >
        <View className="bg-indigo-100 p-2 rounded-full mr-4">{item.icon}</View>

        <View className="flex-1">
          <Text className="text-slate-800 font-medium">{item.title}</Text>
          <Text className="text-slate-500 text-xs">{item.subtitle}</Text>
        </View>

        {item.action === "toggle" ? (
          <Switch
            trackColor={{ false: "#d1d5db", true: "#c7d2fe" }}
            thumbColor={item.state ? "#4f46e5" : "#f4f4f5"}
            ios_backgroundColor="#d1d5db"
            onValueChange={() => item.setState(!item.state)}
            value={item.state}
          />
        ) : (
          <View className="flex-row items-center">
            {item.value && (
              <Text className="text-slate-400 mr-2 text-sm">{item.value}</Text>
            )}
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-slate-200">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-800">Settings</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          {/* User Profile Summary */}
          <TouchableOpacity
            className="bg-white rounded-xl shadow-sm p-4 mb-6 flex-row items-center"
            onPress={() => router.push("/profile")}
          >
            <View className="bg-indigo-500 w-16 h-16 rounded-full items-center justify-center mr-4">
              <Text className="text-white text-xl font-bold">JD</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-slate-800">John Doe</Text>
              <Text className="text-slate-500">john.doe@example.com</Text>
              <View className="bg-indigo-100 rounded-full px-2 py-1 mt-1 self-start">
                <Text className="text-xs text-indigo-600 font-medium">
                  Premium Member
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          {/* Settings Sections */}
          {settingSections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="mb-6">
              <Text className="text-slate-400 text-xs font-medium uppercase mb-2 px-1">
                {section.title}
              </Text>
              <View className="bg-white rounded-xl shadow-sm overflow-hidden">
                {section.items.map((item, itemIndex) =>
                  renderSettingItem(
                    item,
                    itemIndex,
                    itemIndex === section.items.length - 1
                  )
                )}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity className="bg-white rounded-xl shadow-sm mt-4 p-4 items-center">
            <Text className="text-red-500 font-medium">Log Out</Text>
          </TouchableOpacity>

          {/* App Version */}
          <View className="mt-8 items-center">
            <Text className="text-slate-400 text-xs">BrainGames v1.0.0</Text>
            <Text className="text-slate-400 text-xs mt-1">
              © 2024 BrainGames Inc.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row bg-white border-t border-slate-200 px-4 py-2">
        <Link href="/" asChild>
          <TouchableOpacity className="flex-1 items-center">
            <Ionicons name="home-outline" size={24} color="#64748b" />
            <Text className="text-xs text-slate-500">Home</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="trophy-outline" size={24} color="#64748b" />
          <Text className="text-xs text-slate-500">Compete</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="stats-chart-outline" size={24} color="#64748b" />
          <Text className="text-xs text-slate-500">Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="settings" size={24} color="#4f46e5" />
          <Text className="text-xs text-indigo-600 font-medium">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
