import DeliveryIcon from "@/assets/icons/delivery.svg";
import PickupIcon from "@/assets/icons/pickup.svg";
import { Colors } from "@/screens/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekDays() {
  const today = new Date();
  const dow = today.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  return WEEK_LABELS.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { label, date: d.getDate(), isToday: d.toDateString() === today.toDateString() };
  });
}

type OrderStatus = "open" | "closed";
type ModalType = "closeOrders" | "delete" | "reopen" | "cantDelete" | null;

interface MealItem {
  id: string;
  name: string;
  price: number;
  available: number;
  sold: number;
  image: any;
}

interface MealSection {
  title: string;
  items: MealItem[];
}

interface MealDrop {
  title: string;
  orderCount: number;
  orderStatus: OrderStatus;
  pickup: boolean;
  delivery: boolean;
  sections: MealSection[];
  isDraft?: boolean;
}

const MOCK_MEAL_DROP: MealDrop = {
  title: "Thursday 8 Jan, 2026 Meal Drop",
  orderCount: 4,
  orderStatus: "open",
  pickup: true,
  delivery: true,
  sections: [
    {
      title: "Soups and Swallow",
      items: [
        { id: "1", name: "Classic White Loaf", price: 5200, available: 1, sold: 0, image: require("@/assets/onboarding/Landing1.png") },
        { id: "2", name: "Artisan Baguette", price: 5200, available: 5, sold: 0, image: require("@/assets/onboarding/Landing2.png") },
      ],
    },
    {
      title: "Rice Dishes",
      items: [
        { id: "3", name: "Artisan Baguette", price: 5200, available: 0, sold: 5, image: require("@/assets/onboarding/collage3.png") },
        { id: "4", name: "Artisan Baguette", price: 5200, available: 5, sold: 0, image: require("@/assets/onboarding/collage4.png") },
      ],
    },
  ],
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const weekDays = getWeekDays();
  const todayIdx = weekDays.findIndex((d) => d.isToday);
  const [selectedDay, setSelectedDay] = useState(todayIdx >= 0 ? todayIdx : 3);
  const [mealDrop, setMealDrop] = useState<MealDrop | null>(MOCK_MEAL_DROP);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const month = new Date().toLocaleString("default", { month: "long" });
  const selectedDayLabel = weekDays[selectedDay];

  const handleDelete = () =>
    mealDrop && mealDrop.orderCount > 0
      ? setActiveModal("cantDelete")
      : setActiveModal("delete");

  const confirmCloseOrders = () => {
    setMealDrop((prev) => prev && { ...prev, orderStatus: "closed", delivery: false });
    setActiveModal(null);
  };

  const confirmReopen = () => {
    setMealDrop((prev) => prev && { ...prev, orderStatus: "open", delivery: true });
    setActiveModal(null);
  };

  const confirmDelete = () => {
    setMealDrop(null);
    setActiveModal(null);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <SafeAreaView edges={["top"]} style={styles.safeTop}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.monthBtn} activeOpacity={0.7}>
            <Text style={styles.monthText}>{month}</Text>
            <Ionicons name="chevron-expand" size={16} color={Colors.dark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.productLibBtn} activeOpacity={0.7}>
            <View style={styles.productLibIconWrap}>
              <Ionicons name="bag-handle" size={15} color={Colors.primary} />
            </View>
            <Text style={styles.productLibText}>Product Library</Text>
          </TouchableOpacity>
        </View>

        {/* ── Calendar strip ── */}
        <View style={styles.calendarStrip}>
          {weekDays.map((day, i) => (
            <TouchableOpacity
              key={i}
              style={styles.dayCol}
              onPress={() => setSelectedDay(i)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayLabel, selectedDay === i && styles.dayLabelActive]}>
                {day.label}
              </Text>
              <Text style={[styles.dayDate, selectedDay === i && styles.dayDateActive]}>
                {day.date}
              </Text>
              {selectedDay === i && <View style={styles.activeDot} />}
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      {/* ── Scrollable content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: (insets.bottom || 16) + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {!mealDrop ? (
          /* Empty state */
          <View style={styles.emptyWrap}>
            <View style={styles.collageCard}>
              <Image source={require("@/assets/onboarding/Landing2.png")} style={[styles.collageImg, { transform: [{ rotate: "-8deg" }], left: 10, top: 12 }]} />
              <Image source={require("@/assets/onboarding/collage3.png")} style={[styles.collageImg, { transform: [{ rotate: "6deg" }], left: 60, top: 4 }]} />
              <Image source={require("@/assets/onboarding/collage4.png")} style={[styles.collageImg, { transform: [{ rotate: "-3deg" }], left: 108, top: 10 }]} />
            </View>
            <Text style={styles.emptyTitle}>Nothing planned yet</Text>
            <Text style={styles.emptySubtitle}>
              When you schedule what to make, they'll appear here for your customers to order.
            </Text>
            <TouchableOpacity style={styles.planBtn} activeOpacity={0.85}>
              <Text style={styles.planBtnText}>
                Plan a meal for {selectedDayLabel?.label}, {selectedDayLabel?.date} Jan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={{ marginTop: 16 }}>
              <Text style={styles.nextDateText}>Go to next cooking date</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Meal drop card */
          <View style={styles.dropCard}>
            {/* Title & meta */}
            <Text style={styles.dropTitle}>{mealDrop.title}</Text>
            <View style={styles.dropMeta}>
              <Text style={styles.dropOrders}>{mealDrop.orderCount} orders</Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: mealDrop.orderStatus === "open" ? Colors.primary : Colors.destructive },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: mealDrop.orderStatus === "open" ? Colors.primary : Colors.destructive },
                  ]}
                >
                  {mealDrop.orderStatus === "open" ? "Orders Open" : "Orders Closed"}
                </Text>
              </View>
            </View>

            {/* Availability */}
            <View style={styles.availRow}>
              <View style={styles.availItem}>
                <PickupIcon width={16} height={16} />
                <Text style={styles.availLabel}>Pick up</Text>
                <Text style={styles.bullet}> • </Text>
                <Text style={styles.availLabel}>{mealDrop.pickup ? "Available" : "Unavailable"}</Text>
              </View>
              <View style={styles.availSep} />
              <View style={styles.availItem}>
                <DeliveryIcon width={16} height={16} />
                <Text style={styles.availLabel}>Delivery</Text>
                <Text style={styles.bullet}> • </Text>
                <Text style={styles.availLabel}>{mealDrop.delivery ? "Available" : "Unavailabe"}</Text>
              </View>
            </View>

            {/* Action buttons */}
            {mealDrop.orderStatus === "open" ? (
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.7}>
                  <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
                  <Text style={styles.outlineBtnText}>Add more items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
                  <Ionicons name="paper-plane" size={15} color={Colors.background} />
                  <Text style={styles.primaryBtnText}>Share</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.outlineBtn}
                  activeOpacity={0.7}
                  onPress={() => setActiveModal("reopen")}
                >
                  <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
                  <Text style={styles.outlineBtnText}>Re-open orders</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  activeOpacity={0.8}
                  onPress={() => setActiveModal("reopen")}
                >
                  <Ionicons name="refresh" size={15} color={Colors.background} />
                  <Text style={styles.primaryBtnText}>Re-open orders</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Meal sections */}
            {mealDrop.sections.map((section, si) => (
              <View key={si} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                  <View key={item.id} style={styles.mealItem}>
                    <Image source={item.image} style={styles.mealThumb} />
                    <View style={styles.mealInfo}>
                      <Text style={styles.mealName}>{item.name}</Text>
                      {item.sold > 0 ? (
                        <Text style={styles.soldText}>{item.sold} Sold</Text>
                      ) : (
                        <Text style={styles.availableText}>{item.available} Available</Text>
                      )}
                    </View>
                    <Text style={styles.mealPrice}>₦{item.price.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
            ))}

            {/* Add more items */}
            <TouchableOpacity style={styles.addMoreBtn} activeOpacity={0.85}>
              <Ionicons name="add-circle-outline" size={18} color={Colors.background} />
              <Text style={styles.addMoreBtnText}>Add more items</Text>
            </TouchableOpacity>

            {/* Details section */}
            <View style={styles.detailsSection}>
              <Text style={styles.detailsTitle}>Details</Text>
              {[
                { icon: "storefront-outline", label: "Preview on storefront" },
                { icon: "copy-outline", label: "Duplicate this meal drop" },
                { icon: "pencil-outline", label: "Edit meal drop" },
              ].map((d) => (
                <TouchableOpacity key={d.label} style={styles.detailRow} activeOpacity={0.7}>
                  <Ionicons name={d.icon as any} size={20} color={Colors.gray800} />
                  <Text style={styles.detailText}>{d.label}</Text>
                </TouchableOpacity>
              ))}
              {mealDrop.orderStatus === "open" ? (
                <TouchableOpacity
                  style={styles.detailRow}
                  activeOpacity={0.7}
                  onPress={() => setActiveModal("closeOrders")}
                >
                  <Ionicons name="hand-left-outline" size={20} color={Colors.gray800} />
                  <Text style={styles.detailText}>Close orders for this meal drop</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.detailRow}
                  activeOpacity={0.7}
                  onPress={() => setActiveModal("reopen")}
                >
                  <Ionicons name="refresh-outline" size={20} color={Colors.gray800} />
                  <Text style={styles.detailText}>Re-open Orders</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.detailRow, styles.deleteRow]}
                activeOpacity={0.7}
                onPress={handleDelete}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.destructive} />
                <Text style={[styles.detailText, styles.deleteText]}>Delete meal drop</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ── Modals ── */}
      <Modal visible={activeModal !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setActiveModal(null)}
          />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />

            {activeModal === "closeOrders" && (
              <>
                <View style={[styles.modalIconWrap, { backgroundColor: Colors.errorBg }]}>
                  <Ionicons name="bag-remove-outline" size={28} color={Colors.destructive} />
                </View>
                <Text style={styles.modalTitle}>Close orders for this Meal Drop?</Text>
                <Text style={styles.modalBody}>
                  Customers will no longer be able to place new orders. Existing orders will stay
                  active and must still be fulfilled.
                </Text>
                <View style={styles.modalBtns}>
                  <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setActiveModal(null)}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalDestructiveBtn} onPress={confirmCloseOrders}>
                    <Text style={styles.modalDestructiveText}>Close orders</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {activeModal === "delete" && (
              <>
                <View style={[styles.modalIconWrap, { backgroundColor: Colors.errorBg }]}>
                  <Ionicons name="trash-outline" size={28} color={Colors.destructive} />
                </View>
                <Text style={styles.modalTitle}>Delete this Meal Drop?</Text>
                <Text style={styles.modalBody}>
                  This will remove this Meal Drop and all the items inside it. Customers will no
                  longer be able to view or order from it.
                </Text>
                <View style={styles.modalBtns}>
                  <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setActiveModal(null)}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalDestructiveBtn} onPress={confirmDelete}>
                    <Text style={styles.modalDestructiveText}>Delete Meal Drop</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {activeModal === "reopen" && (
              <>
                <View style={[styles.modalIconWrap, { backgroundColor: Colors.successBg }]}>
                  <Ionicons name="bag-check-outline" size={28} color={Colors.primary} />
                </View>
                <Text style={styles.modalTitle}>Reopen orders for this Meal Drop?</Text>
                <Text style={styles.modalBody}>
                  Customers will be able to place new orders again until your order closing time.
                </Text>
                <View style={styles.modalBtns}>
                  <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setActiveModal(null)}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalDestructiveBtn, { backgroundColor: Colors.primary }]}
                    onPress={confirmReopen}
                  >
                    <Text style={styles.modalDestructiveText}>Reopen orders</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {activeModal === "cantDelete" && (
              <>
                <View style={[styles.modalIconWrap, { backgroundColor: Colors.errorBg }]}>
                  <Ionicons name="trash-outline" size={28} color={Colors.destructive} />
                </View>
                <Text style={styles.modalTitle}>You can't delete this Meal Drop</Text>
                <Text style={styles.modalBody}>
                  This Meal Drop already has customer orders. You can close orders or cancel the
                  Meal Drop instead.
                </Text>
                <TouchableOpacity
                  style={[styles.modalCancelBtn, { width: "100%" }]}
                  onPress={() => setActiveModal(null)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.backgroundMuted},
  safeTop: { backgroundColor: Colors.background },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: Colors.background,
  },
  monthBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  monthText: { fontSize: 22, fontWeight: "700", color: Colors.dark },
  productLibBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.backgroundBorder,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
  },
  productLibIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.successBg,
    alignItems: "center",
    justifyContent: "center",
  },
  productLibText: { fontSize: 13, fontWeight: "600", color: Colors.dark },

  /* Calendar */
  calendarStrip: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundInput,
  },
  dayCol: { flex: 1, alignItems: "center", paddingVertical: 6, gap: 2 },
  dayLabel: { fontSize: 12, fontWeight: "500", color: Colors.gray400 },
  dayLabelActive: { color: Colors.primary, fontWeight: "700" },
  dayDate: { fontSize: 16, fontWeight: "600", color: Colors.textSecondary },
  dayDateActive: { color: Colors.primary, fontSize: 18 },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 2,
  },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },

  /* Empty state */
  emptyWrap: { alignItems: "center", paddingTop: 40, paddingHorizontal: 24 },
  collageCard: {
    width: 220,
    height: 150,
    backgroundColor: Colors.background,
    borderRadius: 20,
    marginBottom: 28,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    position: "relative",
    overflow: "hidden",
  },
  collageImg: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
  },
  planBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center",
  },
  planBtnText: { fontSize: 15, fontWeight: "600", color: Colors.background },
  nextDateText: { fontSize: 14, fontWeight: "600", color: Colors.dark },

  /* Meal drop card */
  dropCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    gap: 14,
  },
  dropTitle: { fontSize: 16, fontWeight: "700", color: Colors.dark },
  dropMeta: { flexDirection: "row", alignItems: "center", gap: 10 },
  dropOrders: { fontSize: 13, color: Colors.gray400 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 13, fontWeight: "600" },

  /* Availability */
  availRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  availItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  availSep: { width: 1, height: 14, backgroundColor: Colors.borderLight },
  availLabel: { fontSize: 13, color: Colors.gray600 },
  bullet: { fontSize: 13, color: Colors.gray600 },

  /* Action buttons */
  actionRow: { flexDirection: "row", gap: 10 },
  outlineBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.backgroundBorder,
    borderRadius: 100,
    paddingVertical: 12,
  },
  outlineBtnText: { fontSize: 13, fontWeight: "600", color: Colors.dark },
  primaryBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    paddingVertical: 12,
  },
  primaryBtnText: { fontSize: 13, fontWeight: "600", color: Colors.background },

  /* Sections & items */
  section: { gap: 12 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: Colors.dark },
  mealItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  mealThumb: { width: 64, height: 64, borderRadius: 10 },
  mealInfo: { flex: 1, gap: 4 },
  mealName: { fontSize: 14, fontWeight: "600", color: Colors.dark },
  soldText: { fontSize: 13, color: Colors.primary, fontWeight: "500" },
  availableText: { fontSize: 13, color: Colors.gray400 },
  mealPrice: { fontSize: 14, fontWeight: "700", color: Colors.dark },

  /* Add more */
  addMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    paddingVertical: 16,
  },
  addMoreBtnText: { fontSize: 15, fontWeight: "600", color: Colors.background },

  /* Details section */
  detailsSection: { gap: 0, paddingTop: 4 },
  detailsTitle: { fontSize: 16, fontWeight: "700", color: Colors.dark, marginBottom: 12 },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundSubtle,
  },
  detailText: { fontSize: 14, color: Colors.textSecondary },
  deleteRow: {},
  deleteText: { color: Colors.destructive },

  /* Modal */
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlayModal,
  },
  modalSheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 12,
    alignItems: "center",
    gap: 12,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.borderLight,
    marginBottom: 12,
  },
  modalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.dark,
    textAlign: "center",
  },
  modalBody: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 8,
  },
  modalBtns: { flexDirection: "row", gap: 12, width: "100%" },
  modalCancelBtn: {
    flex: 1,
    borderRadius: 100,
    paddingVertical: 16,
    backgroundColor: Colors.backgroundInput,
    alignItems: "center",
  },
  modalCancelText: { fontSize: 15, fontWeight: "600", color: Colors.gray800 },
  modalDestructiveBtn: {
    flex: 1,
    borderRadius: 100,
    paddingVertical: 16,
    backgroundColor: Colors.destructive,
    alignItems: "center",
  },
  modalDestructiveText: { fontSize: 15, fontWeight: "600", color: Colors.background },
});
